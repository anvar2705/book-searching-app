import { RouteComponentProps } from 'react-router-dom'

export type TBookPageProps = RouteComponentProps<IMatchParams>

export interface IMatchParams {
    id: string
}
