'use client';

import React from 'react';
import { Table, TableCaption, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { categoryColors } from '@/data/categories';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Clock, RefreshCw, Trash, X } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMemo } from 'react';
import { bulkDeleteTransactions } from '@/actions/accounts';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';



const RECURRING_INTERVALS = {
	DAILY: "Daily",
	WEEKLY: "Weekly",
	MONTHLY: "Monthly",
	YEARLY: "Yearly",
};

const TransactionTable = ({transactions = [] }) => {
  
  const [selectedIds, setSelectedIds] = useState([]);
	const [sortConfig, setSortConfig] = useState({
		field: "date",
		direction: "desc",
	});

 const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("");
	const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();



    const filteredAndSortedTransactions = useMemo(() => {
  let result = [...transactions];

  // Apply search filter
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    result = result.filter((transaction) =>
      transaction.description?.toLowerCase().includes(searchLower)
    );
  }

  // Apply type filter
  if (typeFilter) {
    result = result.filter((transaction) => transaction.type === typeFilter);
  }

  // Apply recurring filter
  if (recurringFilter) {
    result = result.filter((transaction) => {
      if (recurringFilter === "RECURRING ONLY") return transaction.isRecurring;
      if (recurringFilter === "NON-RECURRING ONLY") return !transaction.isRecurring;
      return true;
    });
  }


  // Apply sorting
		result.sort((a, b) => {
			let comparison = 0;

			switch (sortConfig.field) {
				case "date":
					comparison = new Date(a.date) - new Date(b.date);
					break;
				case "amount":
					comparison = a.amount - b.amount;
					break;
				case "category":
					comparison = a.category.localeCompare(b.category);
					break;
				default:
					comparison = 0;
			}

			return sortConfig.direction === "asc" ? comparison : -comparison;
		});

		return result;
	}, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);


    const handleSelect = (id) => {
      setSelectedIds((current)=>
        current.includes(id)
        ? current.filter(item=>item!=id)
        : [...current,id]);
    };

    

    const handleSelectAll = () => {
      setSelectedIds((current)=>
        current.length === filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((t) => t.id)
   ); };

   const {
		loading: deleteLoading,
		fn: deleteFn,
		data: deleted,
	} = useFetch(bulkDeleteTransactions);

	const handleBulkDelete = async () => {
		if (
			!window.confirm(
				`Are you sure you want to delete ${selectedIds.length} transactions?`
			)
		)
			return;

		deleteFn(selectedIds);
	};

  useEffect(() => {
		if (deleted && !deleteLoading) {
			toast.success("Transactions deleted successfully"); // Changed from toast.error to toast.success
			setSelectedIds([]); // Clear selected items after successful deletion
		}
	}, [deleted, deleteLoading]);

   const handleClearFilters = () => {
    setSearchTerm("");
		setTypeFilter("");
		setRecurringFilter("");
		setCurrentPage(1);
   };
  return (
    <div className="space-y-4">
      {deleteLoading && (
				<BarLoader className="mt-4" width={"100%"} color="#9333ea" />
			)}
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
            placeholder="Search transactions..."
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1);
						}}
						className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
  <SelectTrigger>
    <SelectValue placeholder="All Types" />
  </SelectTrigger>
  <SelectContent >
    
    <SelectItem value="INCOME" className="bg-white text-black border-none ">Income</SelectItem>
    <SelectItem value="EXPENSE" className="bg-white text-black border-none ">Expense</SelectItem>
  </SelectContent>
</Select>

        <Select value={recurringFilter} onValueChange={(value) => setRecurringFilter(value)}>
  <SelectTrigger className="w-[140px]">
    <SelectValue placeholder="All Transactions" />
  </SelectTrigger>
  <SelectContent>
    
    <SelectItem value="RECURRING ONLY" className="bg-white text-black border-none ">Recurring Only</SelectItem>
    <SelectItem value="NON-RECURRING ONLY" className="bg-white text-black border-none ">Non-Recurring Only</SelectItem>
  </SelectContent>
</Select>

{selectedIds.length> 0 && <div>
  <Button variant="destructive" className="text-black" size="sm" onClick={handleBulkDelete}>
    <Trash className="h-4 w-4 mr-2"/>
    Delete Selected ({selectedIds.length})
  </Button>
  </div>}

  {(searchTerm || typeFilter || recurringFilter)&&(
    <Button variant="outline" size="icon" 
    onClick={handleClearFilters}
    title="Clear filters" >
      <X className="h-4 w-5"/></Button>
  )}
          </div>
        </div>

        {/* Transactions */}
        <div className="runded-md border">
        <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">
        <Checkbox 
        checked={
										selectedIds.length === filteredAndSortedTransactions.length &&
										filteredAndSortedTransactions.length > 0
									}
        onCheckedChange={handleSelectAll}
        />

      </TableHead>
      <TableHead className="cursor-pointer"
      onClick={() => handleSort("date")}>

        <div className="flex items-center">
          Date
          {sortConfig.field === "date" &&
          (sortConfig.direct === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4" />
          )
        )}</div>
      </TableHead>

      <TableHead>Description</TableHead>
      <TableHead className="cursor-pointer"
      onClick={() => handleSort("category")}>

        <div className="flex items-center">Category
          {sortConfig.field === "category" &&
          (sortConfig.direct === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4" />
          )
        )}
        </div>
        
      </TableHead>

      <TableHead className="cursor-pointer"
      onClick={() => handleSort("amount")}>
        <div className="flex items-center justify-end">Amount
          {sortConfig.field === "amount" &&
          (sortConfig.direct === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4" />
          )
        )}
        </div>
      </TableHead>
      <TableHead>Recurring</TableHead>
      <TableHead className="w-[50px]"></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredAndSortedTransactions.length === 0?(
        <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground">
                No Transactions Found
            </TableCell>
        </TableRow>
    ) : (
        filteredAndSortedTransactions.map((transaction)=>(
    <TableRow key={transaction.id}>
      <TableCell>
        <Checkbox onCheckedChange={() => handleSelect(transaction.id)}
          checked={selectedIds.includes(transaction.id)}
          />
      </TableCell>
      <TableCell>{format(new Date(transaction.date),"PP")}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell className="capitalize">
        <span style={{
            background: categoryColors[transaction.category],
        }}
        className="px-2 py-1 rounded text-white text-sm"
        >
            {transaction.category}
        </span>
        </TableCell>
      <TableCell className="text-right font-medium"
      style={{
        color: transaction.type === "EXPENSE" ? "red" : "green",
      }}>
        {transaction.type==='EXPENSE'?"-":"+"}
        {transaction.amount.toFixed(2)}
      </TableCell>
      <TableCell>{transaction.isRecurring?(
        <TooltipProvider>
        <Tooltip>
  <TooltipTrigger><Badge variant="outline" 
  className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple">
        <RefreshCw className="h-3 w-3"/>
        {RECURRING_INTERVALS[transaction.recurringInterval]}
        </Badge></TooltipTrigger>
  <TooltipContent className="bg-black text-white border-none shadow-lg px-3 py-2 rounded-md"
      sideOffset={5}>
    <div className="text-sm">
      <div className="font-medium">Next Date:</div>
      <div>{format(new Date(transaction.nextRecurringDate),"PP")}

      </div>
    </div>
  </TooltipContent>
</Tooltip>
</TooltipProvider>
      ) : (
      <Badge variant="outline" 
      className="gap-1">
        <Clock className="h-3 w-3"/>
        One-time</Badge>
      )}
      </TableCell>
      <TableCell>
        <DropdownMenu >
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
      <MoreHorizontal className="h-4 w-4"/>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="bg-black text-white border-none shadow-lg">
  
    <DropdownMenuItem onClick={() =>
														router.push(
															`/transaction/create?edit=${transaction.id}`
														)
													}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
    <DropdownMenuItem
													className="cursor-pointer text-red-500"
													onClick={() => deleteFn([transaction.id])}
												>
													Delete
												</DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu>
      </TableCell>
    </TableRow>
    ))
    )}
  </TableBody>
</Table>
</div>
    </div>
  )
}

export default TransactionTable