import { invoke } from "@tauri-apps/api";
import { fs } from "@tauri-apps/api";
import axios from "axios";
import * as React from "react";

class _pallete {
    constructor({
        background = "#F7EEDD",
        primary = "#000000",
        secondary = "#FF7F50",
        tertiary = "#8B4513",
        quaternary = "#B2703A",
        dark = true,
    }) {
        this.background = background;
        this.primary = primary;
        this.secondary = secondary;
        this.tertiary = tertiary;
        this.quaternary = quaternary;
        this.dark = dark;
    }

    change({ background, primary, secondary, tertiary, quaternary, dark }) {
        this.background = background;
        this.primary = primary;
        this.secondary = secondary;
        this.tertiary = tertiary;
        this.quaternary = quaternary;
        this.dark = dark;
    }

    changeTheme() {
        temp = this.background;
        this.background = this.quaternary;
        this.primary = this.secondary;
        this.secondary = this.tertiary;
        this.tertiary = this.quaternary;
        this.quaternary = temp;
    }

    async randomize() {
        let data = '{\n    "model": "default"\n}';

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://colormind.io/api/",
            headers: {
                "Content-Type": "text/plain",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                const rbgToHex = (r, g, b) => {
                    return (
                        "#" +
                        [r, g, b]
                            .map((x) => {
                                const hex = x.toString(16);
                                return hex.length === 1 ? "0" + hex : hex;
                            })
                            .join("")
                    );
                };
                this.background = rbgToHex(...response.data.result[0]);
                this.primary = rbgToHex(...response.data.result[1]);
                this.secondary = rbgToHex(...response.data.result[2]);
                this.tertiary = rbgToHex(...response.data.result[3]);
                this.quaternary = rbgToHex(...response.data.result[4]);
                if (!this.dark) {
                    this.changeTheme();
                }
                if (this.palleteUpdated) {
                    this.palleteUpdated();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("randomized pallete");
    }
}

const pallete = new _pallete({});   
invoke("get_base")
    .then((res) => {
        fs.readTextFile(res + "/config.json")
            .then((data) => {
                const { pallete: pal } = JSON.parse(data);
                pallete.change(pal);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });

const Theme = ({ children }) => {
    const updateTheme = () => {
        // Update CSS variables with values from pallete
        document.documentElement.style.setProperty(
            "--background-color",
            pallete.background
        );
        document.documentElement.style.setProperty(
            "--primary-color",
            pallete.primary
        );
        document.documentElement.style.setProperty(
            "--secondary-color",
            pallete.secondary
        );
        document.documentElement.style.setProperty(
            "--tertiary-color",
            pallete.tertiary
        );
        document.documentElement.style.setProperty(
            "--quaternary-color",
            pallete.quaternary
        );
    };

    React.useEffect(() => {
        updateTheme();

        const palleteUpdated = () => {
            updateTheme();
        };

        pallete.palleteUpdated = palleteUpdated;

        return () => {
            pallete.palleteUpdated = null;
        };
    }, []);

    return (
        <div
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            {children}
        </div>
    );
};

export default Theme;
export { pallete };
