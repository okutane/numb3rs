import React, {FormEvent, SyntheticEvent, useEffect} from "react";
import {useState} from "react";
import "./styles.css";

class MoneyCell extends React.Component<{ items: any[], style: string }> {
    calc(): number {
        return this.props.items.map((i) => i.value).reduceRight((a, b) => a + b);
    }

    getCellValue(): any {
        if (!this.props.items || !this.props.items.length) {
            return undefined
        }
        return this.calc()
    }

    evalClassName(): string {
        let classes = "";
        if (this.props.items && this.props.items.find(e => e.pending)) {
            classes += "pending ";
        }
        if (this.props.style) {
            classes += this.props.style
        }

        return classes;
    }

    render() {
        return <td className={`${this.evalClassName()}`}>{this.getCellValue()}</td>;
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
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                xhr.send(JSON.stringify({
                    date: target.dateInput.value,
                    comment: target.commentInput.value,
                    category: target.categoryInput.value,
                    value: target.valueInput.value,
                }));

                xhr.onload = function () {
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', 'http://localhost:8080/spendings');
                    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    xhr.responseType = 'json'
                    xhr.send();

                    xhr.onload = function () {
                        srs(xhr.response);
                        svd(xhr.response.visibleDates.dates);
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
        return [
            {
                value: "2023-01-01",
                style: "today",
            },
        ]
    });

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/spendings');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.responseType = 'json'
        xhr.send();

        xhr.onload = function () {
            setRootState(xhr.response);
            setVisibleDates(xhr.response.visibleDates.dates);
        };
    }, []);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>

            <SpendingsForm setRootState={setRootState} setVisibleDates={setVisibleDates}/>

            <table className="money">
                <thead>
                <tr>
                    <th></th>
                    {visibleDates.map(day => (
                        <th className={day.style}
                            key={day.value}>{new Date(day.value).toLocaleDateString('ru-RU', {
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
                                    key={item.value}
                                    items={
                                        (v as Record<"items", Record<string, any>>)
                                            .items[item.value]
                                    }
                                    style={item.style}
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
