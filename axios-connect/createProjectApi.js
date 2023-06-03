import axios from 'axios'

export class ProjectSetupAPI {
  constructor(token, projectName) {
    this.api = this.createProjectApi(token)
    this.projectName = projectName
  }
  createProjectApi(token) {
    return axios.create({
      baseURL:
        'https://us-central1-relysia-autocreation.cloudfunctions.net/api/v1',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async createGCPProject() {
    const {
      data: { name: fullName, projectId },
    } = await this.api.post(`createProject?id=${this.projectName}`)
    const name = fullName.split('/')[1]
    this.name = name
    this.id = projectId
    return { name, id: projectId }
  }

  async checkProjectCreationStatus() {
    if (!this.name) return false
    const { data } = await this.api.get(`checkOperation?id=${this.name}`)
  }

  async enableFirestoreAPI() {
    const { data } = await this.api.get(`enableFirestore?id=${this.id}`)
    return data
  }

  async createDatabase() {
    const { data } = await this.api.get(`createDatabase?id=${this.id}`)
    return data
  }

  async addFirestoreIndex() {
    const { data } = await this.api.get(`creatingIndexes?id=${this.id}`)
    return data
  }

  async addSecurityRules() {
    const { data } = await this.api.get(`settingSecurityRules?id=${this.id}`)
    return data
  }

  async addFirebaseInProject() {
    const { data } = await this.api.get(`addFirebase?id=${this.id}`)
    return data
  }

  async setupWebapp() {
    const { data } = await this.api.get(`setupWebApp?id=${this.id}`)
    return data
  }
}
