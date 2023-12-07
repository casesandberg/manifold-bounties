'use client'

import z from 'zod'
import Tiptap, { EditorRef } from './Tiptap'
import { Input } from './ui/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from './ui/use-toast'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/Form'
import { Button } from './ui/Button'
import { Tabs, TabsList, TabsTrigger } from './ui/Tabs'
import { createBounty } from '@/lib/manifold'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from './ui/Alert'
import Link from 'next/link'
import { CheckCircledIcon, ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useRef, useState } from 'react'
import { useAuth } from '@/lib/auth'

const INITIAL_TEMPLATE = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Describe the change you would like:',
        },
      ],
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Approval Criteria:',
        },
      ],
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Submit a solution:',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Add a comment below with a link to proof of the change (Github PR, Loom, etc..) to be awarded the bounty.',
        },
      ],
    },
  ],
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.record(z.string(), z.unknown()),
  amount: z.number().min(5),
})

type FormSchema = z.infer<typeof formSchema>

export function CreateBounty() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      amount: 100,
    },
  })
  const { toast } = useToast()
  const editorRef = useRef<EditorRef>(null)
  const [successSlug, setSuccessSlug] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { authKey, requestAuth } = useAuth()

  function onSubmit(data: FormSchema) {
    if (!authKey) {
      requestAuth()
      return
    }

    setIsLoading(true)
    createBounty(data.title, data.description, data.amount)
      .then((bounty) => {
        setIsLoading(false)
        setSuccessSlug(bounty.slug)
        editorRef.current?.clear()
        form.reset()
      })
      .catch((error) => {
        setIsLoading(false)
        toast({
          title: 'Error creating bounty',
          description: error.message,
          variant: 'destructive',
        })
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormLabel>Title</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Title your proposal..." className="text-xl" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field: { onChange } }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormLabel>Description</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Tiptap
                  editorRef={editorRef}
                  id="description"
                  content={INITIAL_TEMPLATE}
                  className="border-1 min-h-[100px] max-w-[100%] border px-4 py-2 focus-visible:ring-2 focus-visible:ring-primary"
                  onChange={onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormLabel>Bounty Amount</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Tabs
                  className="w-auto sm:w-[400px]"
                  value={value.toString()}
                  onValueChange={(change) => {
                    onChange(parseInt(change))
                  }}
                  {...rest}
                >
                  <TabsList className="grid grid-cols-3 font-mono">
                    <TabsTrigger value="100">100</TabsTrigger>
                    <TabsTrigger value="500">500</TabsTrigger>
                    <TabsTrigger value="1000">1000</TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormDescription>
                Select the amount of mana you would like to initially fund this proposal with.
              </FormDescription>
            </FormItem>
          )}
        />

        {!authKey ? (
          <Alert>
            <ExclamationTriangleIcon className="mt-1 h-5 w-5" />
            <AlertTitle className="mb-0 flex flex-row items-center">
              Add your Manifold api key to continue
              <Button size="xs" className="ml-auto" onClick={requestAuth}>
                Add Api Key
              </Button>
            </AlertTitle>
          </Alert>
        ) : null}

        <div className="flex flex-row justify-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </div>

        {successSlug ? (
          <Alert>
            <CheckCircledIcon className="h-5 w-5" />
            <AlertTitle>Your proposal was created successfully!</AlertTitle>
            <AlertDescription>
              It may take a few mements for your proposal to appear. You can find it here:
            </AlertDescription>
            <AlertDescription>
              <Link href={`/bounty/${successSlug}`} className="underline underline-offset-4" target="_blank">
                https://manifoldbounties.com/bounty/{successSlug}
              </Link>
            </AlertDescription>
          </Alert>
        ) : null}
      </form>
    </Form>
  )
}
