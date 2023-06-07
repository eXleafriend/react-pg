import React, { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import jsonFormat from 'json-format';

export type JsonScalar =
  | null
  | boolean
  | string
  | number
  ;

export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonArray = JsonValue[];

export type JsonValue = JsonScalar | JsonObject | JsonArray;

export type PathedValue = [string, JsonValue];

function lookup([path, value]: PathedValue): JsonValue {

  function _lookup(value: JsonValue, paths: string[]): JsonValue {
    if (value === null) {
      return null;
    }
    if (paths.length === 0) {
      return value;
    }

    if (typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
      console.warn(`Ignore paths for ${typeof value} type: `, paths);
      return value;
    }

    const [key, ...rest] = paths;
    if (Array.isArray(value)) {
      if (/^\d+$/.test(key)) {
        const index = parseInt(key, 10);
        return _lookup(value[index], rest);
      } else {
        console.warn(`Ignore key "${key}" for Array type (paths: ${JSON.stringify(paths)})`);
        return value;
      }

    } else {

      return _lookup(value[key], rest);
    }

  }

  return _lookup(value, path === "" ? [] : path.split("."));

}

function patch([path, value]: PathedValue, propValue: JsonValue): JsonValue {

  function _patch(value: JsonValue, paths: string[], propValue: JsonValue): JsonValue {
    // console.log("=== patch() ===")
    // console.log("patch() <<< value = ", value)
    // console.log("patch() <<< paths = ", paths)
    // console.log("patch() <<< propValue = ", propValue)
    if (value === null) {
      // console.log("patch() >>> value = ", null)
      return null;
    }
    if (paths.length === 0) {
      // console.log("patch() >>> value = ", value)
      return propValue;
    }

    if (typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
      console.warn(`Ignore paths for ${typeof value} type: `, paths);
      // console.log("patch() >>> value = ", value)
      return propValue;
    }

    const [key, ...rest] = paths;
    if (Array.isArray(value)) {
      if (/^\d+$/.test(key)) {
        const index = parseInt(key, 10);
        const array = [...value];
        // console.log("patch() --- array = ", array);
        // console.log("patch() --- index = ", index);
        // console.log("patch() --- rest = ", rest);
        const patched = _patch(array[index], rest, propValue);
        // console.log("patch() --- patched = ", patched);
        array[index] = patched;
        // console.log("patch() >>> array = ", array);
        return array;
      } else {
        console.warn(`Ignore key "${key}" for Array type (paths: ${JSON.stringify(paths)})`);
        return value;
      }

    } else {
      const object = { ...value };
      // console.log("patch() --- object = ", object);
      // console.log("patch() --- key = ", key);
      // console.log("patch() --- rest = ", rest);
      const patched = _patch(value[key], rest, propValue);
      // console.log("patch() --- patched = ", patched);
      object[key] = patched;
      // console.log("patch() --- object = ", object);
      return object;
    }

  }

  return _patch(value, path === "" ? [] : path.split("."), propValue);

}

export const PartialObjectForm = function PartialObjectForm() {

  // source of initial value: https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html#Example5
  const hash = global.location.hash;
  const initialPath = hash.startsWith("#json")
    ? hash.startsWith("#json-")
      ? hash.substring("#json-".length)
      : ""
    : ""
    ;
  const initialValue = {
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
  };
  const [pathedValue, setPathedValue] = useState([initialPath, initialValue] as PathedValue);
  const [path, value] = pathedValue;

  const [formClassName, setFormClassName] = useState("");
  const [json, setJson] = useState(jsonFormat(lookup(pathedValue), { type: "space", size: 2 }));

  useEffect(() => {
    setJson(jsonFormat(lookup(pathedValue), { type: "space", size: 2 }));
  }, [pathedValue]);

  function updateJson(newJson: string) {
    setJson(newJson);
    try {
      // console.log("updateJson() -- newJson = ", newJson);
      const propValue = JSON.parse(newJson);
      // console.log("updateJson() -- propValue = ", propValue);
      // if (JSON.stringify(object) === JSON.stringify(value)) {
      //   setFormClassName("");
      // } else {
      //   setFormClassName("changed");
      // }
      const newValue = patch(pathedValue, propValue);
      // console.log("updateJson() -- newValue = ", newValue);
      setPathedValue([path, newValue]);
    } catch {
      setFormClassName("invalid");
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>Whole</div>
          <textarea value={jsonFormat(value, { type: "space", size: 2 })} rows={25} style={{
            width: '100%',
          }} readOnly />
        </Col>
        <Col sm={2}>
          <a href={`#json`} onClick={() => setPathedValue(["", value])} style={{ fontWeight: path === "" ? 'bold' : '' }}>object</a>
          <ObjectTree pathedValue={pathedValue} setPathedValue={setPathedValue} propValue={value} />
        </Col>
        <Col>
          <div>Partial: {path || "."}</div>
          <textarea value={json} rows={25} className={formClassName} style={{
            width: '100%',
          }} onChange={e => updateJson(e.target.value)} />
        </Col>
      </Row>
    </Container>
  );

}

interface ObjectTreeProp {
  pathedValue: PathedValue;
  setPathedValue: React.Dispatch<React.SetStateAction<PathedValue>>;
  parentPath?: string
  propValue: JsonValue
}

function ObjectTree({ pathedValue, setPathedValue, propValue, parentPath }: ObjectTreeProp) {
  // console.log(`OjbectTree() <<< .value = `, value)
  const [path, value] = pathedValue;

  if (Array.isArray(propValue)) {

    return (
      <ol className="tree" start={0}>
        {propValue.map((item, index) => {
          const currentPath = parentPath === undefined ? index.toString() : `${parentPath}.${index}`;
          return (
            <li key={index}>
              <a href={`#json-${currentPath}`} onClick={() => setPathedValue([currentPath, value])} style={{ fontWeight: path === currentPath ? 'bold' : '' }}><i>(element)</i></a>
              {hasNonScalarProperty(item) ? (<ObjectTree pathedValue={pathedValue} setPathedValue={setPathedValue} propValue={item} parentPath={currentPath} />) : (<></>)}
            </li>
          );
        })}
      </ol>
    );

  } else if (typeof propValue === "object") {

    if (propValue === null) {

      return (
        <></>
      );

    } else {


      return (
        <ul className="tree">
          {Object.entries(propValue).map(([key, item]) => {
            // console.log("key", key)
            // console.log("item", item)
            // console.log("isScalar(item)", isScalar(item))
            const currentPath = parentPath === undefined ? key : `${parentPath}.${key}`;
            if (isScalar(item)) {
              return (<></>);
            }
            const cn = isScalar(item) ? "dimmed" : "";
            return (
              <li className={cn} key={key}>
                <a href={`#json-${currentPath}`} onClick={() => setPathedValue([currentPath, value])} style={{ fontWeight: path === currentPath ? 'bold' : '' }}><i>{key}</i></a>
                {!isScalar(item) && hasNonScalarProperty(item) ? (<ObjectTree pathedValue={pathedValue} setPathedValue={setPathedValue} propValue={item} parentPath={currentPath} />) : (<></>)}
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

function isScalar(item: JsonValue) {
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

function hasNonScalarProperty(item: JsonValue): boolean {
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
  return false;
  // console.log(`hasNonScalarProperty() >>> hasNonScalarProperty = `, false);
}

export default PartialObjectForm;
