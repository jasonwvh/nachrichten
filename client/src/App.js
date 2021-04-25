import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import "./App.css";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="menu">
                    <AppBar
                        position="static"
                        style={{
                            background: "#2E3B55",
                            alignItems: "center",
                        }}
                    >
                        <Toolbar>
                            <Button size="large" color="inherit">
                                <Typography
                                    variant="h6"
                                    style={{
                                        marginRight: 16,
                                        marginLeft: 16,
                                    }}
                                >
                                    Deutsche Welle
                                </Typography>
                            </Button>
                            <Button size="large" color="inherit">
                                <Typography
                                    variant="h6"
                                    style={{
                                        marginRight: 16,
                                        marginLeft: 16,
                                    }}
                                >
                                    ZDF
                                </Typography>
                            </Button>
                            <Button size="large" color="inherit">
                                <Typography
                                    variant="h6"
                                    style={{
                                        marginRight: 16,
                                        marginLeft: 16,
                                    }}
                                >
                                    Das Erste
                                </Typography>
                            </Button>
                            <Button size="large" color="inherit">
                                <Typography
                                    variant="h6"
                                    style={{
                                        marginRight: 16,
                                        marginLeft: 16,
                                    }}
                                >
                                    Welt
                                </Typography>
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <br />
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path={"/readNews"}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
