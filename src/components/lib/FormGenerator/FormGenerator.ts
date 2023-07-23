import { JsonObject, TreeNode } from '@/types/JsonObjects'

import { toRefs, reactive } from 'vue'

export default {
	props: {
		jsonObjects: Array,
	},

	components: {
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
							children: getNode(json, i, json[i].code),
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
							children: getNode(json, index, obj.code),
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

		return {
			treeDataForm
		}
	}
}
