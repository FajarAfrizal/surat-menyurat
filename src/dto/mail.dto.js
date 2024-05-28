const mailCreateDto = (data) => {
    return {
        user_id: data.user_id,
        about: data.about,
        from: data.from,
        mail_code: data.mail_code,
        date_of_letter: data.date_of_letter,
        date_of_receipt: data.date_of_receipt,
        notes: data.notes,
        status: data.status,
        tendency: data.tendency,
        mail_type: data.mail_type,
        file: data.file
    }
}

module.exports = {
    mailCreateDto
}