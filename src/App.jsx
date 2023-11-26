import "./App.css";

import * as React from "react";

import { invoke } from "@tauri-apps/api";

import Focus from "./Focus";
import Theme, { pallete } from "./Pallete";
import Navbar from "./components/Navbar";

function App() {
    const [disks, setDisks] = React.useState([]);

    React.useEffect(() => {
        invoke("get_disks")
            .then((disks) => {
                console.log(disks);
                if (disks.length == 0) {
                    if (disks[0].total_space == 0) {
                        Focus.selectDrive();
                        Focus.selectFolder(disks[0].name);
                    }
                }

                return disks;
            })
            .then((disks) => {
                setDisks(disks);
                return disks;
            })
            .catch((err) => console.log(err));
    }, []);

    if (disks.length === 0) {
        return <div>Loading...</div>;
    } else {
        return (
            <Theme>
                <Navbar
                    titleComponent={<h3 className="title">Select a drive</h3>}
                    leftComponents={[]}
                    rightComponents={[]}
                />
                <div className="driveContainer">
                    {disks.map((disk) => (
                        <button
                            onClick={() => {
                                Focus.selectFolder(disk.name);
                                pallete.randomize();
                            }}
                            key={disk.name}
                            className="coolBtn"
                        >
                            {disk.name}
                        </button>
                    ))}
                </div>
            </Theme>
        );
    }
}

export default App;
