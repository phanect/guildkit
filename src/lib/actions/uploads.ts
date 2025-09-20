"use server";

import { logoDirName, removeObject } from "@/lib/storage.ts";
import type { ActionState } from "@/lib/types.ts";

/**
 * Server action to delete a file from S3 compatible storage
 * @param fileName - logo file name
 * @returns Promise with deletion result
 */
export const deleteFile = async (fileName: string): Promise<ActionState> => {
  try {
    // TODO check if recruiter in the org

    await removeObject(`${ logoDirName }/${ fileName }`);

    return { success: true };
  } catch (error) {
    console.error("File deletion error:", error);

    return {
      success: false,
      error: {
        message: "Failed to delete file",
      },
    };
  }
};
