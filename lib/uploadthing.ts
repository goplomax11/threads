import { OurFileRouter } from "@/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";
 

 
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();