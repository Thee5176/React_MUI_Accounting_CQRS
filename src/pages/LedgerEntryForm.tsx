import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import ErrorAlert from '../components/ErrorAlert';
import LedgerItemsFormTable from '../components/LedgerItemsFormTable';

export interface LedgerEntry {
    id:string;
    date: string;
    description: string;
    ledgerItems: LedgerItem[];
    timestamp: string;
}

interface LedgerItem {
    coa: string;
    amount: number;
    type: string;
}

export default function LedgerEntryForm() {
    // DateField - prefilled today's date
    const currentDate = new Date().toISOString().substring(0,10);

    // Handle Form with React Hook Form
    const {
        register,
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
    }, [isSubmitSuccessful, currentDate]);

    console.log(watch());
    return (
        <>
        <Typography sx={{py:3}} variant='h2'>Record Transaction Form</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <FormControl sx={{py:3}}>
                    <InputLabel htmlFor='date'>
                        Date
                    </InputLabel>
                    <OutlinedInput
                        {...register('date', {
                            required: true,
                            validate: (value:string) => {
                                const date = new Date(value);
                                return (date.getTime() < new Date().getTime()) || 'Invalid date';
                            }
                        })}
                        type='date'
                        defaultValue={currentDate}
                    />
                    <ErrorAlert
                        message={errors.date?.message}
                    />
                </FormControl>
                <FormControl sx={{py:3}}>
                    <InputLabel htmlFor='description'>
                        Description
                    </InputLabel>
                    <OutlinedInput
                        {...register('description', {
                            required: true,
                            minLength: { value: 5, message: 'Description must be at least 5 characters' },
                            maxLength: { value: 50, message: 'Description must be less than 50 characters' },
                        })} 
                        type='text'
                        placeholder='Being <Account1> <verb> From <Account2>'
                        autoComplete='description'
                    />
                    <ErrorAlert
                        message={errors.description?.message}
                    />
                </FormControl>
                <LedgerItemsFormTable register={register} errors={errors}></LedgerItemsFormTable>
                <Button type='submit' variant='contained'>
                    Record
                </Button>
            </FormGroup>
        </form>
        </>
    );
}