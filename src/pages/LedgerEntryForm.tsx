import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import ErrorAlert from '../components/ErrorAlert';
import DateField from '../components/LedgerInputField/DateField';
import DescriptionField from '../components/LedgerInputField/DescriptionField';
import LedgerItemsFormTable from '../components/LedgerItemsFormTable/LedgerItemsFormTable';

export interface LedgerEntry {
    id:string;
    date: string;
    description: string;
    ledgerItems: LedgerItem[];
    timestamp: string;
}

export interface LedgerItem {
    coa: string;
    amount: number;
    type: string;
}

export default function LedgerEntryForm() {
    // DateField - prefilled today's date
    const currentDate: string = new Date().toISOString().substring(0,10);

    // Handle Form with React Hook Form
    const {
        control,
        getValues,
        handleSubmit,
        watch,
        reset,
        formState: { 
            errors,
            isSubmitSuccessful,
        },
    } = useForm<LedgerEntry>()

    // Send Data to Command Service
    const sendLedgerEntry = async (data: LedgerEntry) => {
        const response = await fetch('http://localhost:8181/ledger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return await response.text();
    };
    const onSubmit: SubmitHandler<LedgerEntry> = async (data: LedgerEntry) => {
        // Add id and timestamp to the data
        data.timestamp = new Date().toISOString();
        
        console.log(data);
        const result = await sendLedgerEntry(data);
        console.log(result);
    }
    // Reset form after submission
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                id: '',
                date: currentDate,
                description: '',
                ledgerItems: [
                    {coa: '', amount: 0, type: 'Debit'},
                    {coa: '', amount: 0, type: 'Credit'}
                ],
                timestamp: '',
            });
        }
    }, [reset, isSubmitSuccessful, currentDate]);

    console.log(watch());
    return (
        <>
        <Typography sx={{py:3}} variant='h2'>Record Transaction</Typography> 
        <form onSubmit={handleSubmit(onSubmit)}> //Remove this and place into page
            <FormGroup>
                <DateField currentDate={currentDate} control={control} />
                <ErrorAlert
                    message={errors.date?.message}
                />
                <DescriptionField control={control} />
                <ErrorAlert
                    message={errors.description?.message}
                />
                <LedgerItemsFormTable control={control} errors={errors} getValues={getValues}/>
                <Button type='submit' variant='contained'>
                    Record
                </Button>
            </FormGroup>
        </form>
        </>
    );
}