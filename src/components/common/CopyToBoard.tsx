
import { useCopyToClipboard } from "usehooks-ts";
import { TextField, Button, Snackbar, Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
export default function CopyToBoard() {
    const [value, copy] = useCopyToClipboard();
    const [text, setText] = useState("");
    const [copyState, setcopyState] = useState(false);

    return (
        <div className="container">
            <TextField
                type="text"
                value={text}
                id="outlined-basic"
                label="Text"
                variant="outlined"
                placeholder="Type some text here"
                onChange={(e) => setText(e.target.value)}
            />
            <div className="copy-area">
                <Button
                    variant="contained"
                    onClick={() => {
                        copy(text);
                        value ?
                            setcopyState(true) : setcopyState(false);
                    }}
                >
                    Click to Copy
                </Button>
            </div>
            <Snackbar
                open={copyState}
                autoHideDuration={3000}
                onClose={() => setcopyState(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >

                <Alert sx={{ width: "100%" }} onClose={() => setcopyState(false)} severity='success'><AlertTitle>Copied</AlertTitle>{value} </Alert>


            </Snackbar>
        </div>
    );
}
