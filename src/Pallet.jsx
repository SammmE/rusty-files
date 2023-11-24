import axios from "axios";
import * as React from "react";

import config from ".rusty-files/config.json";

class _Pallet {
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

    change({
        background = "#7D4031",
        primary = "#D9BF8E",
        secondary = "#8B5742",
        tertiary = "#A8683A",
        quaternary = "#634D3C",
        dark = true,
    }) {
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
                if (this.palletUpdated) {
                    this.palletUpdated();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("randomized pallet");
    }
}

const Pallet = new _Pallet(config);

const Theme = ({ children }) => {
    const updateTheme = () => {
        // Update CSS variables with values from Pallet
        document.documentElement.style.setProperty(
            "--background-color",
            Pallet.background
        );
        document.documentElement.style.setProperty(
            "--primary-color",
            Pallet.primary
        );
        document.documentElement.style.setProperty(
            "--secondary-color",
            Pallet.secondary
        );
        document.documentElement.style.setProperty(
            "--tertiary-color",
            Pallet.tertiary
        );
        document.documentElement.style.setProperty(
            "--quaternary-color",
            Pallet.quaternary
        );
    };

    React.useEffect(() => {
        updateTheme();

        const palletUpdated = () => {
            updateTheme();
        };

        Pallet.palletUpdated = palletUpdated;

        return () => {
            Pallet.palletUpdated = null;
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
export { Pallet };
