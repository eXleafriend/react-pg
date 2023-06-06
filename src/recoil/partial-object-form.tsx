import React, { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import jsonFormat from 'json-format';

export type Scalar =
  | undefined
  | null
  | boolean
  | string
  | number
  ;

export interface ComplexObject {
  [key: string]: Json;
}

export type ComplexArray = Json[];

export type Json = Scalar | ComplexObject | ComplexArray;

class PathedObject {
  public constructor(
    public object: Json,
    public readonly path?: string,
  ) {
  }

  public getPathedObject(): Json {
    if (this.path === undefined) {
      return this.object;
    }

    const paths = this.path.split(".");

    function lookup(object: Json, paths: string[]): Json {
      const [key, ...rest] = paths;
      if (object === undefined || object === null) {
        return undefined;
      }
      if (typeof object === "boolean" || typeof object === "number" || typeof object === "string") {
        return undefined;
      }
      if (key in object) {
        if (/^\d+$/.test(key)) {
          if (Array.isArray(object)) {
            const index = parseInt(key, 10);
            const value = object[index];
            if (rest.length == 0) {
              return value;
            } else {
              return lookup(value, rest);
            }
          } else {
            return undefined;
          }
        } else {
          const value = (object as ComplexObject)[key];
          if (rest.length == 0) {
            return value;
          } else {
            return lookup(value, rest);
          }
        }
      }

    }
    return lookup(this.object, paths);
  }

  public setPathedObject(value: Json): void {
    if (this.path === undefined) {
      this.object = value;
      return;
    }

    const paths = this.path.split(".");

    function lookup(object: Json, paths: string[], value: Json): void {
      const [key, ...rest] = paths;
      if (object === undefined || object === null) {
        return undefined;
      }
      if (typeof object === "boolean" || typeof object === "number" || typeof object === "string") {
        return undefined;
      }
      if (key in object) {
        if (/^\d+$/.test(key)) {
          if (Array.isArray(object)) {
            const index = parseInt(key, 10);
            if (rest.length == 0) {
              object[index] = value;
            } else {
              return lookup(value, rest, value);
            }
          } else {
            return undefined;
          }
        } else {
          if (rest.length == 0) {
            (object as ComplexObject)[key] = value;
          } else {
            return lookup(value, rest, value);
          }
        }
      }

    }
    lookup(this.object, paths, value);
  }

}

export const PartialObjectForm = function PartialObjectForm() {

  // source of initial value: https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html#Example5
  const [object, setObject] = useState(new PathedObject({
    register: {
      in: {
        type: "s3",
        bucket: "my-s3-bucket",
        path_prefix: "logs/csv-",
        endpoint: "s3-us-west-1.amazonaws.com",
        access_key_id: "ABCXYZ123ABCXYZ123",
        secret_access_key: "AbCxYz123aBcXyZ123",
        parser: {
          charset: "UTF-8",
          newline: "CRLF",
          type: "csv",
          delimiter: ',',
          quote: '"',
          escape: '"',
          null_string: 'NULL',
          skip_header_lines: 1,
          columns: [
            { name: "id", type: "long" },
            { name: "account", type: "long" },
            { name: "time", type: "timestamp", format: '%Y-%m-%d %H:%M:%S' },
            { name: "purchase", type: "timestamp", format: '%Y%m%d' },
            { name: "comment", type: "string" },
          ],
        },
      },
      out: {
        type: "sftp",
        host: "127.0.0.1",
        port: 22,
        user: "civitaspo",
        secret_key_file: "/Users/civitaspo/.ssh/id_rsa",
        secret_key_passphrase: "secret_pass",
        user_directory_is_root: false,
        timeout: 600,
        path_prefix: "/data/sftp",
        file_ext: "_20151020.tsv",
        sequence_format: ".%01d%01d",
        temp_file_threshold: 10737418240,
        formatter: {
          type: "csv",
          delimiter: "\t",
          newline: "CRLF",
          newline_in_field: "LF",
          charset: "UTF-8",
          quote_policy: "MINIMAL",
          quote: '"',
          escape: "\\",
          null_string: "\\N",
          default_timezone: 'UTC',
        },
      },
    },
  }));

  const [formClassName, setFormClassName] = useState("");
  const [json, setJson] = useState(jsonFormat(object.getPathedObject() || null, { type: "space", size: 2 }));

  useEffect(() => {
    setJson(jsonFormat(object.getPathedObject() || null, { type: "space", size: 2 }));
  }, [object]);

  function updateJson(newValue: string) {
    setJson(newValue);
    try {
      const value = JSON.parse(newValue);
      if (JSON.stringify(object) === JSON.stringify(value)) {
        setFormClassName("");
        object.setPathedObject(value);
      } else {
        setFormClassName("changed");
      }
    } catch {
      setFormClassName("invalid");
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>Whole</div>
          <textarea value={jsonFormat(object, { type: "space", size: 2 })} rows={25} style={{
            width: '100%',
          }} readOnly />
        </Col>
        <Col sm={2}>
          <a href={`#json`} onClick={() => setObject(new PathedObject(object.object))} style={{ fontWeight: object.path === undefined ? 'bold' : '' }}>object</a>
          <ObjectTree pathedObject={object} setObject={setObject} value={object.object} />
        </Col>
        <Col>
          <div>Partial: {object.path || "."}</div>
          <textarea value={json} rows={25} className={formClassName} style={{
            width: '100%',
          }} onChange={e => updateJson(e.target.value)} />
        </Col>
      </Row>
    </Container>
  );

}

interface ObjectTreeProp {
  pathedObject: PathedObject;
  setObject: React.Dispatch<React.SetStateAction<PathedObject>>;
  value: Json;
  parentPath?: string
}

function ObjectTree({ pathedObject, setObject, value, parentPath }: ObjectTreeProp) {
  // console.log(`OjbectTree() <<< .value = `, value)

  if (Array.isArray(value)) {

    return (
      <ol className="tree" start={0}>
        {value.map((item, index) => {
          const path = parentPath === undefined ? index.toString() : `${parentPath}.${index}`;
          return (
            <li key={index}>
              <a href={`#json-${path}`} onClick={() => setObject(new PathedObject(pathedObject.object, path))} style={{ fontWeight: pathedObject.path === path ? 'bold' : '' }}><i>(element)</i></a>
              {hasNonScalarProperty(item) ? (<ObjectTree pathedObject={pathedObject} setObject={setObject} value={item} parentPath={path} />) : (<></>)}
            </li>
          );
        })}
      </ol>
    );

  } else if (typeof value === "object") {

    if (value === null) {

      return (
        <></>
      );

    } else {


      return (
        <ul className="tree">
          {Object.entries(value).map(([key, item]) => {
            // console.log("key", key)
            // console.log("item", item)
            // console.log("isScalar(item)", isScalar(item))
            const path = parentPath === undefined ? key : `${parentPath}.${key}`;
            if (isScalar(item)) {
              return (<></>);
            }
            const cn = isScalar(item) ? "dimmed" : "";
            return (
              <li className={cn} key={key}>
                <a href={`#json-${path}`} onClick={() => setObject(new PathedObject(pathedObject.object, path))} style={{ fontWeight: pathedObject.path === path ? 'bold' : '' }}>{key}</a>
                {!isScalar(item) && hasNonScalarProperty(item) ? (<ObjectTree pathedObject={pathedObject} setObject={setObject} value={item} parentPath={path} />) : (<></>)}
              </li>
            );
          })}

        </ul>
      );

    }

  } else {

    return (
      <></>
    );

  }

}

function isScalar(item: Json) {
  switch (typeof item) {
    case "undefined":
      return true;
    case "boolean":
      return true;
    case "number":
      return true;
    case "string":
      return true;
    case "object":
      if (item === null) {
        return true;
      }
      return false;
    default:
      return false;
  }
}

function hasNonScalarProperty(item: Json) {
  if (typeof item === "object" && item !== null) {
    // console.log(`hasNonScalarProperty() <<< item = `, item);
    const hasNonScalarProperty = Object.entries(item).map(([k, v]) => {
      // console.log(`hasNonScalarProperty() --- k = `, k);
      // console.log(`hasNonScalarProperty() --- v = `, v);
      // console.log(`hasNonScalarProperty() --- isScalar(v) = `, isScalar(v));
      return !isScalar(v);
    }).some(b => b);
    // console.log(`hasNonScalarProperty() >>> hasNonScalarProperty = `, hasNonScalarProperty);
    return hasNonScalarProperty;
  }
  // console.log(`hasNonScalarProperty() >>> hasNonScalarProperty = `, false);
}

export default PartialObjectForm;
