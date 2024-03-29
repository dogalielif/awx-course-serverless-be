import { requestHandler } from "../utils/http.util";
import { changePath, getParsedObject, sendMessageToSQS } from "../services/importService";

const onInput = async (event) => {

  const records = event.Records;
  for(const record of records) {
    try {
      console.log(`Record: ${JSON.stringify(record)}`);
      const parsed = await getParsedObject(record);
      await changePath(record);
      await sendMessageToSQS(parsed);
    } catch(err) {
      throw new Error(err);
    }
  }
  return {statusCode: 202};
}

export const parseCSVFile = event => requestHandler(event, onInput)