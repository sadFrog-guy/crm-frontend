import { Gender } from "./gender";

export interface Student {
    id: number;
    group: number;
    branch: number;
    sex: Gender;
    status: "Учится" |
            "На отпуске" |
            "Бросил" |
            "Закончил" |
            "Скоро закончит" |
            "Оплата просрочена";
    name: string;
    surname: string;
    phone: string;
    whatsapp: string;
    description: string;
    source: 'social' | 'friends' | 'saw';
    payment: number;
    next_payment_date: string | null;
    study_start_date: string;
}