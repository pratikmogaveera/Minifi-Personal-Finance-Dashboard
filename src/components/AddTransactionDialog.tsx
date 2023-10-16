"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { categoriesList, cn, methodsList } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { trpc } from "@/app/_trpc/client"
import { useState } from "react"
import { toast } from 'sonner';


const formSchema = z.object({
    receiver: z.string().min(1),
    amount: z.coerce.number().min(1, "Amount cannot be negative or zero."),
    category: z.string().min(1, "Please choose a category."),
    method: z.string().min(1, "Please choose a method."),
    date: z.date().max(new Date()),
    description: z.string().max(100)
})

function AddTransactionDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const utils = trpc.useContext()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            receiver: "",
            category: "",
            method: "",
            description: "",
            amount: 0,
        }
    })

    const resetForm = () => {

        form.reset({
            receiver: "",
            category: "",
            method: "",
            description: "",
            amount: 0,
        })
    }

    const { mutateAsync: submit, isLoading } = trpc.createTransaction.useMutation({
        onSuccess: () => {
            utils.getTransactions.invalidate()

            toast.success("Transaction has been added.")

            resetForm()

            setIsOpen(false)
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        submit(values)
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <button className={buttonVariants({ className: "flex gap-2 items-center bg-brand" })} onClick={() => setIsOpen(prev => !prev)}>
                    <Plus />
                    <span className="font-bold hidden sm:block">Add Transaction</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[95%] rounded-lg">
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Add details of the transaction. Click save when you&apos;re done. (Astericks <span className="text-red-800">&#x2A;</span> represent a required field.)
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4 py-4">
                            <FormField control={form.control} name="receiver" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver <span className="text-red-800">&#x2A;</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Whom did you pay to?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField control={form.control} name="amount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount <span className="text-red-800">&#x2A;</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="How much did you pay?" type="number" {...field} onChange={event => field.onChange(event.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField control={form.control} name="category" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category <span className="text-red-800">&#x2A;</span></FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <SelectTrigger className="w-[180px] focus-visible:ring-brand focus:border-brand sm:focus:border-none">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    {categoriesList.map(item => <SelectItem value={item} key={item}>{item}</SelectItem>)}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField control={form.control} name="method" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Method <span className="text-red-800">&#x2A;</span></FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <SelectTrigger className="w-[180px] focus-visible:ring-brand focus:border-brand sm:focus:border-none">
                                                <SelectValue placeholder="Select a method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Methods</SelectLabel>
                                                    {methodsList.map(item => <SelectItem value={item} key={item}>{item}</SelectItem>)}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of transaction <span className="text-red-800">&#x2A;</span></FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal focus-visible:ring-brand focus:border-brand sm:focus:border-none",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-70 text-brand" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between w-full">
                                        <FormLabel>Description</FormLabel>
                                        <Label htmlFor="description" className="text-muted-foreground">
                                            {form.getValues().description ? form.getValues().description.length : 0}/100
                                        </Label>
                                    </div>
                                    <FormControl>

                                        <Textarea
                                            {...field}
                                            placeholder="Enter description of the transaction..."
                                            className="text-[16px] col-span-3 focus-visible:ring-brand focus:border-brand sm:focus:border-none"
                                            maxLength={100}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />

                        </div>

                        <DialogFooter>
                            <DialogTrigger asChild>
                                <Button type="button" className=" text-background font-bold" onClick={() => { setIsOpen(prev => !prev); resetForm(); }}>Close</Button>
                            </DialogTrigger>
                            <Button type="submit" className="bg-brand hover:bg-brand/90 text-background font-bold mb-4" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
                            </Button>
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTransactionDialog
