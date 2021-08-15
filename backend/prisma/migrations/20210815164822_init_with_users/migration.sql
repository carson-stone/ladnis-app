-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "balance" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "name_first" TEXT NOT NULL,
    "name_last" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "tags" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
