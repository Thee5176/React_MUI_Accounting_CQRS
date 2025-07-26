import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import LedgerItemsFormTable from '../components/LedgerItemsFormTable';

export interface LedgerEntry {
    id:string,
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

export default function LedgerCreateForm() {
    // DateField - prefilled today's date
    const currentDate = new Date().toISOString().substring(0,10);

    const {
        register, 
        handleSubmit
    } = useForm<LedgerEntry>()
    const onSubmit: SubmitHandler<LedgerEntry> = (data) => console.log(data);
    
    return (
        <>
        <Typography sx={{py:3}} variant='h2'>Record Transaction Form</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <FormControl sx={{py:3}}>
                    <InputLabel htmlFor='date' required>
                        Date
                    </InputLabel>
                    <OutlinedInput
                        {...register('date')} 
                        id='date'
                        name='date'
                        type='date'
                        defaultValue={currentDate}
                        required
                    />
                </FormControl>
                <FormControl sx={{py:3}}>
                    <InputLabel htmlFor='description' required>
                        Description
                    </InputLabel>
                    <OutlinedInput
                        {...register('description')} 
                        id='description'
                        name='description'
                        type='text'
                        placeholder='Being <Account1> <verb> From <Account2>'
                        autoComplete='description'
                        required
                    />
                </FormControl>
                <LedgerItemsFormTable register={register}></LedgerItemsFormTable>
                <Button type='submit' variant='contained'>
                    Record
                </Button>
            </FormGroup>
        </form>
        </>
    );
}