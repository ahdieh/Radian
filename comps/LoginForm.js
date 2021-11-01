import { useState, useRef } from 'react';
const { MongoClient } = require("mongodb");

import classes from './LoginForm.module.css';

const url = "mongodb+srv://Radian:Assignment@login.nbtph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

function LoginForm () {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current;
        const enteredPassword = passwordInputRef.current;

        async function run() {
            try {
                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(dbName);

                // Use the collection "people"
                const col = db.collection("user");

                // Construct a document
                let userDocument = {
                    "username": "Alan6",
                    "password": '1234'
                }

                // Insert a single document, wait for promise so we can read it back
                const p = await col.insertOne(userDocument);
                // Find one document
                const myDoc = await col.findOne();
                // Print to the console
                console.log(myDoc);

            } catch (err) {
                console.log(err.stack);
            }

            finally {
                await client.close();
            }
        }

        if(isLogin) {
            run().catch(console.dir);
        } else {

        }
    };

    return (
        <div className={classes.auth}>
            <form>
                <div className={classes.control}>
                    <label>{isLogin ? 'Login' : 'Create Account'}</label>
                    <br/>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
