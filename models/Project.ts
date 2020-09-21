import { Entity, Unique, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Asset } from './Asset'

@Entity('projects')
@Unique(["name"])
export class Project extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column()
    description: string;

    @Column({ type: "text" })
    teamName: string;

    @OneToMany(type => Asset, asset => asset.project)
    assets: Asset[];
}