import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Paper, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    translatedText: {
        justifyContent: "center",
        textAlign: "center",
    },
    newsTitle: {
        margin: "20px",
        justifyContent: "center",
        textAlign: "center",
        textRender: "optimizelegibility",
        letterSpacing: ".02em",
    },
    newsText: {
        fontFamily: "Roboto, Arial, Helvetica",
        width: "120ch",
        color: "black",
        fontSize: "1.25em",
        lineHeight: "2em",
        textRender: "optimizelegibility !important",
        letterSpacing: ".02em",
    },
    newsBox: {
        padding: "5% 10%",
    },
    newsContentBox: {
        paddingBottom: "50px",
        textAlign: "left",
    },
    button: {
        justifyContent: "center",
        fontSize: "1.5em",
    },
    image: {
        display: "block",
        margin: "auto",
        marginBottom: 20,
        justifyContent: "center",
        textAlign: "center",
        maxWidth: "40vw",
        height: "auto",
        objectFit: "contain",
    },
});

class ReadNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: decodeURI(this.props.match.params.link),
            title: null,
            contents: null,
            word: null,
            translated: null,
        };
    }

    async translate(q) {
        await axios
            .post(`http://localhost:9000/translate`, { q: q })
            .then((data) => {
                this.setState({
                    translated: data.data,
                });
            })
            .catch((err) => {
                console.log("error", err);
            });
    }

    async getContent(url) {
        await fetch(`http://localhost:9000/retrieveNews?url=${url}`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ title: data.title });
                this.setState({ contents: data.contents });
            })
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.getContent(this.state.link);
    }

    componentWillUnmount() {
        this.setState({ titles: null, contents: null });
    }

    handleClick = async (word) => {
        this.setState({ word });
        this.translate(word);
    };

    renderContents = (contents) => {
        const { classes } = this.props;
        if (contents) {
            const words = String(contents).split(/(\s+)/);

            return words.map((word, i) => (
                <span
                    key={i}
                    className={classes.newsText}
                    onClick={() => this.handleClick(word)}
                >
                    {word}
                </span>
            ));
        } else {
            return "";
        }
    };

    render() {
        const { classes } = this.props;
        const { word, translated, title, contents } = this.state;
        return (
            <div className="App">
                <div className={classes.root}></div>
                <Paper elevation={3}>
                    <div className={classes.newsBox}>
                        <img
                            className={classes.image}
                            alt="new"
                            src="https://source.unsplash.com/random/300x300"
                        />

                        <Typography
                            className={classes.translatedText}
                            variant="h5"
                            gutterBottom
                        >
                            {word}
                        </Typography>
                        <Typography
                            className={classes.translatedText}
                            variant="h6"
                            gutterBottom
                        >
                            {translated}
                        </Typography>
                        <Typography
                            className={classes.newsTitle}
                            variant="h3"
                            gutterBottom
                        >
                            {title}
                        </Typography>
                        <div className={classes.newsContentBox}>
                            {contents &&
                                contents.map((content, i) => (
                                    <p>{this.renderContents(content)}</p>
                                ))}
                        </div>
                        <Typography
                            className={classes.button}
                            variant="button"
                            display="block"
                            gutterBottom
                        >
                            <Link to={`/`} style={{ textDecoration: "none" }}>
                                Back
                            </Link>
                        </Typography>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ReadNews);
