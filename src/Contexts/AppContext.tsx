import axios from 'axios';
import React, { createContext, useMemo, useState } from 'react';
import { Alert } from 'react-native';

export type Transaction = {
    id?: string;
    amount?: number;
    unique_code?: number;
    status?: string;
    sender_bank?: string;
    account_number?: string;
    beneficiary_name?: string;
    beneficiary_bank?: string;
    remark?: string;
    created_at?: string;
    completed_at?: string;
    fee?: number;
};

type ContextProps = {
    children: React.ReactNode
};
type StateProps = {
    list: Array<Transaction>;
    item: Transaction;
    orderType: number;
    isLoading: boolean;
    keyword : string;
};
type ContextValue = {
    state: StateProps;
    getData: () => Promise<void>;
    onChangeKeyword: (params : string) => void;
    onChangeOrder : (params : number) => void;
    list: Array<Transaction>;
    onChangeItem :  (params : Transaction) => void;
};


const initialState: StateProps = {
    list: [],
    item: {},
    orderType: 0,
    isLoading: false,
    keyword : '',
};

export const AppContext = createContext<ContextValue>({
    state: initialState,
    getData: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    onChangeKeyword: function (): void {
        throw new Error('Function not implemented.');
    },
    onChangeOrder: function (): void {
        throw new Error('Function not implemented.');
    },
    list: [],
    onChangeItem: function (): void {
        throw new Error('Function not implemented.');
    },
});

export const ContextProvider = ({ children }: ContextProps) => {

    const [state, setState] = useState<StateProps>(initialState);

    const getData = async () => {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        await axios.get('https://recruitment-test.flip.id/frontend-test')
        .then(res => {
            const { data } = res;
            if (data && Object.keys(data).length > 1) {
                const datas : Array<Transaction> = Object.values(data);
                setState((prevState) => ({ ...prevState, list: datas }));
            }
        })
        .catch(err => {
            Alert.alert(err.message);
        })
        .finally(() => {
            setState((prevState) => ({ ...prevState, isLoading: false }));
        });
    };

    const onChangeKeyword = (text :string) => {
        setState((prevState) => ({ ...prevState, keyword: text }));
    };

    const onChangeOrder = (type : number) => {
        setState((prevState) => ({ ...prevState, orderType: type }));
    };

    const onChangeItem = (item : Transaction) => {
        setState((prevState) => ({ ...prevState, item: item }));
    };

    const list = useMemo(() => {
        let arr = state.list;
        if ( state.keyword && state.keyword.trim().length > 0 ) {
            arr = arr.filter((transaction) =>  transaction?.beneficiary_name?.toLocaleLowerCase().includes(state.keyword.toLowerCase()) ||
            transaction?.beneficiary_bank?.toLowerCase().includes(state.keyword.toLowerCase()) ||
            transaction?.sender_bank?.toLowerCase().includes(state.keyword.toLowerCase()) ||
            transaction?.amount?.toString().includes(state.keyword.toLowerCase()));
        }
        if ( state.orderType ) {
             switch(state.orderType) {
                case 1:
                arr = arr.sort((a, b) => (a.beneficiary_name || '').localeCompare((b.beneficiary_name || '')));
                break;
                case 2:
                arr = arr.sort((a, b) => (b.beneficiary_name || '').localeCompare((a.beneficiary_name || '')));
                break;
                case 3:
                arr = arr.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '', undefined, { numeric: true, sensitivity: 'base' }));
                break;
                case 4:
                    arr = arr.sort((a, b) => (a.created_at || '').localeCompare(b.created_at || '', undefined, { numeric: true, sensitivity: 'base' }));
                break;
                default:
                return arr;
            }
        }
        return arr;
    }, [state.keyword, state.list, state.orderType ]);


    const value = useMemo(() => ({ state, getData, onChangeKeyword, onChangeOrder, onChangeItem, list }), [list, state]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
