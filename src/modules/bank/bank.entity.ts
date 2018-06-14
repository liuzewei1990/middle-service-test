import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Banks {
    @PrimaryGeneratedColumn() //创建自增长/自生成/顺序化的列
    id: number;

    @Column({ length: 500 })
    bankCode: string;

    @Column('text')
    bankName: string;

}