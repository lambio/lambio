import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    ManyToOne,
    AfterUpdate,
    AfterInsert,
    AfterRemove
} from "typeorm";
import { Project } from './Project'
import { ConcourseClient } from "./ConcourseClient";

@Entity('assets')
export class Asset extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ type: "json" })
    info: {};

    @ManyToOne(type => Project, project => project.assets)
    project: Project;

    @AfterInsert()
    createPipeline() {
        let con = new ConcourseClient()
        con.createPipeline(this)
    }

    @AfterUpdate()
    updatePipeline() {
        let con = new ConcourseClient()
        con.updatePipeline(this)
    }

    @AfterRemove()
    removePipeline() {
        let con = new ConcourseClient()
        con.removePipeline(this)
    }
}