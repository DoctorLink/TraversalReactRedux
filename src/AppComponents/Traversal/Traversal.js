
import React from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux'

import { GlobalStyle, BodyContent, Title } from '../../Components'
import { Home, Traversal } from '../../Pages'
import { Modal, Summary } from '../../Containers'

const TitleButton = withRouter(({ history }) => (
    <Title onClick={() => history.push("/")}>Traversal Client</Title>
));

export default ({ store, history }) => {
    if (!history)
        history = createBrowserHistory();
    return (<Provider store={store}>
        <Router history={history}>
            <GlobalStyle />
            <BodyContent>
                <TitleButton />
                <Route exact path="/" component={Home} />
                <Route path="/traversal/:id?" component={Traversal} />
                <Summary />
                <Modal />
            </BodyContent>
        </Router>
    </Provider>)
}