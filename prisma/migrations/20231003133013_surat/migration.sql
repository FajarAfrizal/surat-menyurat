-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `position_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `about` VARCHAR(191) NOT NULL,
    `from` VARCHAR(191) NULL,
    `mail_code` INTEGER NOT NULL,
    `date_of_letter` DATETIME(3) NOT NULL,
    `date_of_receipt` DATETIME(3) NULL,
    `notes` VARCHAR(191) NOT NULL,
    `mail_type` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispotition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mail_id` INTEGER NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `tendency` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_position_id_fkey` FOREIGN KEY (`position_id`) REFERENCES `position`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispotition` ADD CONSTRAINT `dispotition_mail_id_fkey` FOREIGN KEY (`mail_id`) REFERENCES `mail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
