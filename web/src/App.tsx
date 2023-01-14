import React, {FormEvent, SyntheticEvent, useEffect} from "react";
import {useState} from "react";
import "./styles.css";
import {SpendingsResponse} from "./apiClient/data-contracts";
import SpendingForm from "./components/SpendingForm";
import {Spendings} from "./apiClient/Spendings";

class MoneyCell extends React.Component<{ items: any[] }> {
    calc(): number {
        return this.props.items.map((i) => i.value).reduceRight((a, b) => a + b);
    }

    evalClassName(): string {
        if (this.props.items.find(e => e.pending)) {
            return "pending";
        }

        return "";
    }

    render() {
        if (!this.props.items || !this.props.items.length) {
            return <td/>;
        }

        return <td className={`${this.evalClassName()}`}>{this.calc()}</td>;
    }
}

export default function App() {

    const [rootState, setRootState] = useState<any>({
        expenses: {cats: {"home": {items: [], subCats: {}, title: "home"}}},
        visibleDates: {dates: []}
    });

    const [visibleDates, setVisibleDates] = useState(() => {
        return Array.from(
            new Set([
                "2022-08-01",
                "2022-09-01",
                "2022-10-01",
                "2022-11-01",
                "2022-11-16",
                "2022-11-17",
                "2022-11-30",
                "2022-12-16",
                "2023-04-01"
            ])
        ).sort();
    });

    const api = new Spendings()

    let updateSpendings = () => {
        let promiseResponse = api.showSpendingsUsingGet()
        promiseResponse.then(
            (response) => {
                setRootState(response.data);
                setVisibleDates(response.data.visibleDates.dates.map(a => a.value));
            },
            (errorReason) => {
            },
        )
    }

    useEffect(() => updateSpendings(), [])

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>

            <SpendingForm updateState={() => updateSpendings()}/>

            <table className="money">
                <thead>
                <tr>
                    <th></th>
                    {visibleDates.map(day => (
                        <th key={day}>{new Date(day).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'numeric',
                        })}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Object.entries(rootState["expenses"].cats.home.subCats).map(
                    ([cat, v]) => (
                        <tr key={cat}>
                            <td>
                                {(v as Record<"title", string>).title}
                            </td>
                            {visibleDates.map((item, index) => (
                                <MoneyCell
                                    key={item}
                                    items={
                                        (v as Record<"items", Record<string, any>>).items[item]
                                    }
                                />
                            ))}
                        </tr>
                    )
                )}
                </tbody>
            </table>
            <h2>Оплачено: {rootState.expenses.paid}</h2>
            <h2>Запланировано: {rootState.expenses.planned}</h2>
            <h2>Итого: {rootState.expenses.total}</h2>

        </div>
    );
}
