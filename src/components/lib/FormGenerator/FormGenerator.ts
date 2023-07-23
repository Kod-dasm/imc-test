import { JsonObject, TreeNode } from '@/types/JsonObjects'
import FormField from '../FormField/FormField.vue'

import { toRefs, reactive } from 'vue'

export default {
	props: {
		jsonObjects: Array,
	},

	components: {
		FormField,
	},

	setup(props: any) {
		const { jsonObjects } = toRefs(props)

		const getNode = (json: JsonObject[], index: number, code: string): TreeNode[] => {
			const nodes: TreeNode[] = []
			for (let i = index; i < json.length; i++) {
				if (code === json[i].parent) {
					if (json[i].type === 'container') {
						nodes.push({
							...json[i],
							childrens: getNode(json, i, json[i].code),
						})
						continue
					}
					nodes.push({
						...json[i],
					})
				}
			}
			return nodes
		}

		const getTree = (json: JsonObject[]): TreeNode[] => {
			const tree: TreeNode[] = []
			json.map((obj, index) => {
				if (!obj.parent) {
					if (obj.type === 'container') {
						tree.push({
							...obj,
							childrens: getNode(json, index, obj.code),
						})
					}
					else {
						tree.push({
							...obj
						})
					}
				}
			})
			return tree
		}

		const treeDataForm = reactive<TreeNode[]>(getTree(jsonObjects.value))

		const getParseNodes = (nodes: TreeNode[]): object => {
			return Object.assign({}, ...nodes.map(node => ({
				[node.code]: node.value ?? null,
				...(node.childrens ? getParseNodes(node.childrens) : {})
			})))
		}

		const getParseTree = (tree: TreeNode[]) => {
			return tree.map(node => ({
				[node.code]: node.value ?? null,
				...(node.childrens ? getParseNodes(node.childrens) : {})
			}))
		}

		return {
			treeDataForm,
			getParseTree
		}
	}
}
