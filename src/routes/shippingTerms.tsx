import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import {
    createFileRoute,
    useLoaderData,
    useRouter,
} from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Check, X } from 'lucide-react'
import customerQueries from '../queries/customer_quieries'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/shippingTerms')({
    component: ShippingTerms,
    loader: async ({ context }) => {
        const { apolloClient } = context
        const { data } = await apolloClient.query({
            query: customerQueries.GET_SHIPPING_TERMS,
        })
        return data
    },
})

const newTermSchema = z.object({
    code: z.string().min(1, 'Code is required'),
    description: z.string().min(1, 'Description is required'),
})

type NewTermForm = z.infer<typeof newTermSchema>

function ShippingTerms() {
    const { shippingTerms } = useLoaderData<any>({ from: '/shippingTerms' })
    const router = useRouter()

    const [editingCode, setEditingCode] = useState<string | null>(null)
    const [editDescription, setEditDescription] = useState('')

    const [updateShippingTerm] = useMutation(
        customerQueries.UPDATE_SHIPPING_TERM,
    )
    const [createShippingTerm, { loading: creating }] = useMutation(
        customerQueries.CREATE_SHIPPING_TERM,
    )

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewTermForm>({
        resolver: zodResolver(newTermSchema),
        defaultValues: { code: '', description: '' },
    })

    const startEditing = (term: { code: string; description: string }) => {
        setEditingCode(term.code)
        setEditDescription(term.description)
    }

    const cancelEditing = () => {
        setEditingCode(null)
        setEditDescription('')
    }

    const saveEdit = async (code: string) => {
        await updateShippingTerm({
            variables: {
                code,
                input: { description: editDescription },
            },
        })
        setEditingCode(null)
        router.invalidate()
    }

    const onCreateSubmit: SubmitHandler<NewTermForm> = async (data) => {
        await createShippingTerm({ variables: { input: data } })
        reset()
        router.invalidate()
    }

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">Shipping Terms</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-50">Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-25">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shippingTerms.map(
                        (term: { code: string; description: string }) => (
                            <TableRow key={term.code}>
                                <TableCell className="font-medium">
                                    {term.code}
                                </TableCell>
                                <TableCell>
                                    {editingCode === term.code ? (
                                        <Input
                                            value={editDescription}
                                            onChange={(e) =>
                                                setEditDescription(
                                                    e.target.value,
                                                )
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter')
                                                    saveEdit(term.code)
                                                if (e.key === 'Escape')
                                                    cancelEditing()
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        term.description
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingCode === term.code ? (
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon-xs"
                                                onClick={() =>
                                                    saveEdit(term.code)
                                                }
                                            >
                                                <Check />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon-xs"
                                                onClick={cancelEditing}
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="icon-xs"
                                            onClick={() => startEditing(term)}
                                        >
                                            <Pencil />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>

            <div className="mt-8 max-w-md rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Add New Shipping Term
                </h2>
                <form
                    onSubmit={handleSubmit(onCreateSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="code">Code</Label>
                        <Input id="code" {...register('code')} />
                        {errors.code && (
                            <p className="text-sm text-destructive">
                                {errors.code.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" {...register('description')} />
                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <Button type="submit" disabled={creating}>
                        {creating ? 'Saving...' : 'Add Term'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
