import {Entity, Unique, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {Asset} from './Asset'

@Entity('projects')
@Unique(["name"])
export class Project extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    teamName: string;

    @OneToMany(type => Asset, asset => asset.project)
    assets: Asset[];
}