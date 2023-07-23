export type Types = 'container' | 'input' | 'datepicker' | 'list'
export type Value = string | number

export interface ListData {
	key: number
	value: string
}

export interface JsonObject {
	type: Types
	code: string
	parent: string
	listdata?: ListData[]
	value?: Value
}

export interface TreeNode extends JsonObject {
	childrens?: TreeNode[]
}
