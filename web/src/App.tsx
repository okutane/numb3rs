import React, {FormEvent, SyntheticEvent, useEffect} from "react";
import {useState} from "react";
import "./styles.css";

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

class SpendingsForm extends React.Component<{ setRootState: any, setVisibleDates: any }> {
    render() {
        const srs = this.props.setRootState;
        const svd = this.props.setVisibleDates;

        return (

            <form onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                    categoryInput: { value: string };
                    commentInput: { value: string };
                    dateInput: { value: string };
                    valueInput: { value: number };
                };

                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:8080/numbers');
                xhr.setRequestHeader(
                    'Content-type',
                    'application/json; charset=utf-8',
                );

                xhr.send(JSON.stringify({
                    date: target.dateInput.value,
                    comment: target.commentInput.value,
                    category: target.categoryInput.value,
                    value: target.valueInput.value,
                }));

                xhr.onload = function () {
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', 'http://localhost:8080/spendings');
                    xhr.setRequestHeader(
                        'Content-type',
                        'application/json; charset=utf-8',
                    );
                    xhr.responseType = 'json'
                    xhr.send();

                    xhr.onload = function () {
                        srs(xhr.response);
                        svd(
                            xhr.response.visibleDates.dates
                                .map((a: Record<"value", string>) => a.value),
                        );
                    };
                };
            }}>
                <div>
                    <label htmlFor="categoryInput">Category:</label>
                    <input id="categoryInput" type="text"/>

                    <label htmlFor="commentInput">Comment:</label>
                    <input id="commentInput" type="text"/>

                    <label htmlFor="valueInput">Value:</label>
                    <input id="valueInput" type="text"/>

                    <label htmlFor="dateInput">Date:</label>
                    <input id="dateInput" type="text"/>
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default function App() {
    const [rootState, setRootState] = useState<any>({
        expenses: {cats: {"home": {items: [], subCats: {}, title: "home"}}},
        visibleDates: {dates: []},
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
                "2023-04-01",
            ]),
        ).sort();
    });

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/spendings');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.responseType = 'json'
        xhr.send();

        xhr.onload = function () {
            setRootState(xhr.response);
            setVisibleDates(
                xhr.response.visibleDates.dates
                    .map((a: Record<"value", string>) => a.value),
            );
        };
    }, []);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>

            <SpendingsForm setRootState={setRootState}
                           setVisibleDates={setVisibleDates}/>

            <table className="money">
                <thead>
                <tr>
                    <th></th>
                    {visibleDates.map(day => (
                        <th key={day}>{new Date(day).toLocaleDateString(
                            'ru-RU',
                            {
                                day: 'numeric',
                                month: 'numeric',
                            },
                        )}</th>
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
                    ),
                )}
                </tbody>
            </table>
            <h2>Оплачено: {rootState.expenses.paid}</h2>
            <h2>Запланировано: {rootState.expenses.planned}</h2>
            <h2>Итого: {rootState.expenses.total}</h2>

        </div>
    );
}