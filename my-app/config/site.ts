import { siteConfig as siteConfigType } from "@/types";
import { link } from "node:fs";
import { describe } from "node:test";

export const siteConfig: SiteConfig ={
    name: "postwriter",
    description: "",
    url:"http://localhost:3000/",
    ogImage:"",
    links:{
        x:"https://x.com/Shin_Engineer",
        github:"https://github.com/Shin-sibainu"
    }
};
