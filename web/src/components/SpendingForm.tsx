import React from "react";

class SpendingForm extends React.Component<{ onSubmit: any }> {
    render() {

        return (
            <form onSubmit={this.sendExpenditure()}>
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

    private sendExpenditure() {
        return (e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
                categoryInput: { value: string };
                commentInput: { value: string };
                dateInput: { value: string };
                valueInput: { value: number };
            };

            let request = this.createRequest();

            request.send(JSON.stringify({
                date: target.dateInput.value,
                comment: target.commentInput.value,
                category: target.categoryInput.value,
                value: target.valueInput.value,
            }));
        };
    }

    private createRequest() {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/numbers');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = () => this.props.onSubmit()
        return xhr;
    }
}

export default SpendingForm