import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index, BeforeInsert} from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Index({ unique: true })
	@Column()
	email: string;

	@Column()
	password: string;

	//before insert
	@BeforeInsert()
	async saveEncryptedPassword() {
		this.password = await bcrypt.hash(this.password, 5);
	}

	@CreateDateColumn({
		name: "created_at"
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: "updated_at"
	})
	updatedAt: Date;
}
