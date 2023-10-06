import Head from "next/head";
import {FabricCanvas} from "@/components/fabric-canvas";
import {useState} from "react";
import {templateOne} from "@/mtg-templates/template-1/template-one-form";
import {Template} from "@/mtg-templates/template";
import {Button} from "@mui/material";
import {templateThree} from "@/mtg-templates/template-3/template-three-form";

export default function Home() {
    const [template, setTemplate] = useState(templateOne);
    const [data, setData] = useState(template.sampleInput);
    const [error, setError] = useState("");
    const [json, setJson] = useState(() => {
        const result = template.buildJson(data);
        if(result.success){
            return result.json;
        }
        else {
            throw new Error("All wrong :(");
        }
    });

    const changeTemplate = (nextTemplate : Template<any>) =>{
        setTemplate(nextTemplate);
        const nextData = nextTemplate.sampleInput;
        setData(nextData)
        const result = nextTemplate.buildJson(nextData);
        if(result.success){
            setJson(result.json);
        }
        else {
            throw new Error("All wrong :(");
        }
    }

    return (
        <>
            <Head>
                <title>Visual Abstract Generator</title>
            </Head>
            <div style={{padding: 30}}>
                <div>
                    <Button onClick={()=>changeTemplate(templateOne)}>Template 1</Button>
                    <Button onClick={()=>changeTemplate(templateThree)}>Template 3</Button>
                </div>
        <textarea
            style={{height: 500, width: 500}}
            value={data}
            onChange={(e) => {
                let parameterInput = e.target.value;
                setData(parameterInput);
                const result = template.buildJson(parameterInput);
                if(result.success) {
                    setJson(result.json);
                }
                else {
                    setError(result.error);
                }
            }}
        />
                <p>{error}</p>
                <FabricCanvas
                    json={json}
                    height={template.height}
                    width={template.width}
                />
            </div>
        </>
    );
}
