# React_CQRS

## Table Of Content
1. [Run Process](#run-process)
2. [Development Process](#development-process)
3. [Wireframe](#wireframe)
4. [Component Design](#component-design)
5. [Final Product](#final-product)

## Run Process with Docker
```bash
#1 Prepare directory and clone from github
git clone 
cd React_CQRS

#2 Install and run process with docker
docker compose up -d --build

```
Check the running project at [port 8185](http://localhost:8185)

## Development Process
see [Main Repository](https://github.com/Thee5176/Accounting_CQRS_Project)

## Wireframe
Quick Handsketch for form page UI design

<img width="300" height="400" alt="image" src="https://github.com/user-attachments/assets/df92b02e-a7ab-4775-81e7-de7703429c97" />

## Component Design
Detail of reusable component composition

<img width="300" height="400" alt="image" src="https://github.com/user-attachments/assets/e2a81153-967a-4c5b-a9f1-16e8aca2060f" />

## Final Product Version
### V1 : MUI Form Element + ReactHookForm: useForm
<img width="300" height="400" alt="image" style="text-align:center" src="https://github.com/user-attachments/assets/cd162e8a-32de-4f5b-9496-57dc86f87baa" />


| Feature                     | Description                                                                                                  | Reference Link                                                                                                                     |
|----------------------------|--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Dynamic Component Combination | Use Atomic Design Pattern to break down complex components into simpler, maintainable ones                        | ![Atomic Design](https://github.com/user-attachments/assets/04133e47-ed58-4533-80f7-550c15ee9bc4)                                  |
| Dynamically Add LedgerItems | Dynamically add new LedgerItems input fields                                                                 | - [LedgerItemInputField.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/develop/src/components/LedgerItemInputField/index.tsx)<br>- [LedgerItemsFormTable.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/99129f8f92ce6f16994f2c5bc34de9fb2cbabeb6/src/components/LedgerItemsFormTable.tsx)<br>![Dynamic LedgerItems](https://github.com/user-attachments/assets/3de1e39d-5f7d-490a-82ad-9aa172664620) |
| Fetch COA Select Field      | Fetch "Code of Account" select options from Query Service                                                    | [CoaField.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/develop/src/components/LedgerItemInputField/CoaField.tsx) <br>![COA Fetch](https://github.com/user-attachments/assets/b30bbb36-a320-4f43-8d8d-2c7dca4c5596) |
| React Hook Form Integration | Manage form submit function using React Hook Form's useForm hook                                            | [LedgerEntryForm.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/develop/src/pages/LedgerEntryForm.tsx)<br>- [Confluence Report](https://thee5176.atlassian.net/wiki/spaces/~7120207a78457b1be14d1eb093ee37135d9fb6/pages/68026372/React+MUI#3.-Form-handling-with-React-Hook-Form) |
| Validation & Error Message  | Validate input fields and display error messages before submission                                            | [Validation Example](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/develop/src/pages/LedgerEntryForm.tsx)  |
| Reusable Validation Component | Centralize validation error message display                                                                | [Error Message Component](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/develop/src/components/ErrorAlert.tsx) <br>![Validation UI](https://github.com/user-attachments/assets/c10acabc-9434-4bc7-912d-6a02e190df8a) |

### V2 : Add MUI DataGrid + React Router + ReactHookForm: useFormArray, useFormContext, Controller
<img width="300" height="400" alt="image" src="https://github.com/user-attachments/assets/cbf8d494-3f07-4eac-a280-98494e14a21b" />
<img width="300" height="400" alt="image" src="https://github.com/user-attachments/assets/8da7502d-cd73-474e-94b1-12c594b36c52" />

| Feature                     | Description                                                                                                  | Reference Link                                                                                                                     |
|----------------------------|--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Refactor : Dynamically Add LedgerItems | Render Input Field with useFieldArray hook                                                                 | - [LedgerItemInputRow/index.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/32fcdb3cc919de7ca9b675412543c254e618d66e/src/components/ledger_form/LedgerItemsFormTable/LedgerItemInputRow/index.tsx)<br>![useFormArray](https://github.com/user-attachments/assets/2d7fae6c-7712-4725-8e60-5b6530b58cdc) |
| Realtime Balance Status Check          | Render Input Field with useFieldArray hook                                | - [BalanceAmountCheck.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/10c1af7a6544d1a4675d9a9fc30074935d882ba2/src/components/ledger_form/LedgerItemsFormTable/BalanceAmountCheck.tsx)<br>![Expands](https://github.com/user-attachments/assets/b02892e9-793b-46a3-8c7b-8e921412fa37) |
| add React Router for SPA multi-page rendering          | Render Layout and change the inner component based on site url                                | - [Routes.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/c3861a8a075470abd2692da3e1164c3fb2b36d52/src/Routes.tsx)<br>- [Apps.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/8ac7aa4f12abdf70534a1c7c02cc1dd6a2187be0/src/App.tsx#L9)<br>- [Layout.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/993e530436c379ae5f67cffbcef3c935bed49f9e/src/Layout.tsx)<br>- [NawDrawer.tsx](https://github.com/Thee5176/React_MUI_Accounting_CQRS/blob/993e530436c379ae5f67cffbcef3c935bed49f9e/src/components/NavDrawer.tsx)<br>![Router](https://github.com/user-attachments/assets/9dba46cc-2c2d-4341-89c9-bf881822e850) |

