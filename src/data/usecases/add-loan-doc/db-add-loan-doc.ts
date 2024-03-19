import fs from "fs"
import path from "path"
import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"

import { AddLoanDoc } from "@/domain/usecases/add-loan-doc"
import { AddLoanModel } from "../add-loan/db-add-loan-protocols"

export class DbAddLoanDoc implements AddLoanDoc {
  add(loan: AddLoanModel): void {
    const content = fs.readFileSync(
      path.resolve("./public", "loan-form.docx"),
      "binary",
    )

    const zip = new PizZip(content)

    const doc = new Docxtemplater(zip, {})

    doc.render({
      receiver: loan.receiver,
      date: loan.date.toString(),
      name: loan.item.name,
      category: loan.item.category?.name,
      serialNumber: loan.item.serialNumber,
      model: loan.item.model,
      amount: loan.item.amount,
      observation: loan.observation,
      lender: loan.lender,
    })

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    })

    fs.writeFileSync(
      path.resolve(
        `./tmp/cautelas`,
        `cautela-${String(loan.receiver) + "-" + String(loan.item.name)}.docx`,
      ),
      buf,
    )
  }
}
