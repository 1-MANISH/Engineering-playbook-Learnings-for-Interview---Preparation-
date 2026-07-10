-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('pending', 'processing', 'completed');

-- CreateTable
CREATE TABLE "Submissions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL,
    "output" TEXT,
    "error" TEXT,
    "code_status" TEXT,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);
