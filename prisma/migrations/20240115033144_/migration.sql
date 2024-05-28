/*
  Warnings:

  - You are about to drop the column `tendency` on the `dispotition` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `dispotition` table. All the data in the column will be lost.
  - You are about to drop the column `position_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `position` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `dispotition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tendency` to the `mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_position_id_fkey`;

-- AlterTable
ALTER TABLE `dispotition` DROP COLUMN `tendency`,
    DROP COLUMN `to`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mail` ADD COLUMN `file` VARCHAR(191) NULL,
    ADD COLUMN `status` INTEGER NOT NULL,
    ADD COLUMN `tendency` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `position_id`,
    ADD COLUMN `employee_id` INTEGER NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position_id` INTEGER NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `position_name_key` ON `position`(`name`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_position_id_fkey` FOREIGN KEY (`position_id`) REFERENCES `position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mail` ADD CONSTRAINT `mail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispotition` ADD CONSTRAINT `dispotition_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
