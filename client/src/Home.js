import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    CardMedia,
    CardActions,
    CardContent,
    Typography,
} from "@material-ui/core";
import ReadNews from "./ReadNews.js";
import Parser from "rss-parser";
import "./App.css";

const styles = (muiBaseTheme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 600,
        maxHeight: 800,
        minWidth: 500,
        maxWidth: 700,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
    },
    media: {
        paddingTop: "56.25%",
    },
    content: {
        textAlign: "left",
        padding: muiBaseTheme.spacing(5),
    },
    heading: {
        fontWeight: "bold",
    },
    subheading: {
        lineHeight: 1.8,
    },
    button: {
        justifyContent: "center",
        fontSize: "1.4em",
        margin: 20,
    },
    link: {},
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsName: "",
            newsItems: [],
        };
    }

    async getLatestNews() {
        let parser = new Parser();
        let feed = await parser.parseURL("https://rss.dw.com/xml/rss-de-news");

        this.setState({ newsName: feed.title });
        this.setState({ newsItems: feed.items });
    }

    renderNews(newsItems) {
        const { classes } = this.props;

        for (let item of newsItems) {
            item.link = encodeURIComponent(item.link);
        }

        return (
            <Grid container spacing={3}>
                {newsItems.map((item, i) => (
                    <Grid key={i} item xs>
                        <Link
                            to={`/readNews/${item.link}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Card className={classes.card} variant="outlined">
                                <CardMedia
                                    className={classes.media}
                                    image={`https://source.unsplash.com/random/800x600?sig={${i}}`}
                                />
                                <CardContent className={classes.content}>
                                    <Typography
                                        className={"MuiTypography--heading"}
                                        variant="h4"
                                        color="textPrimary"
                                        gutterBottom
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        className={"MuiTypography--subheading"}
                                        variant="body1"
                                        component="p"
                                    >
                                        <br />
                                        {item.content}
                                    </Typography>
                                </CardContent>

                                <CardActions className={classes.button}>
                                    <Typography variant="button">
                                        Read More
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        );
    }

    componentDidMount() {
        this.getLatestNews();
    }

    render() {
        const { newsName, newsItems } = this.state;

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <div className="App">
                            <div className="header">
                                <Typography variant="h4">{newsName}</Typography>
                            </div>
                            <div className="container">
                                <div className="newsContent">
                                    {newsItems && this.renderNews(newsItems)}
                                </div>
                            </div>
                        </div>
                    </Route>
                    <Route
                        path={"/readNews/:link"}
                        render={(props) => <ReadNews {...props} />}
                    ></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default withStyles(styles)(Home);
