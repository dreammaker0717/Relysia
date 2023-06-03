import { useState } from 'react'
import Breadcrumbs from 'components/app/breadcrumbs'
import useProjects from 'hooks/useProjects'
import SearchBar from 'components/app/search-bar'
import NextLink from 'next/link'
import { PlusIcon } from '@heroicons/react/24/solid'
import ProjectGridItem from 'components/app/infrastructure/project-grid-item'
import Loader from 'components/loader'

export default function InfrastructurePage() {
  const { projects, loading } = useProjects()
  const [search, setSearch] = useState('')

  const filteredProjects = projects.filter(({ projectName }) =>
    projectName.toLowerCase().includes(search.toLowerCase()),
  )

  function ProjectsGrid() {
    if (loading) return <Loader />
    if (projects.length === 0)
      return (
        <div className="flex gap-14">
          <div className="flex-1">
            <div
              className="text-blue-500 font-medium text-sm bg-blue-50 py-1 px-1.5 flex items-center gap-3 rounded-full mb-4"
              style={{ width: 'fit-content' }}
            >
              <div className="py-1 px-1.5 bg-white rounded-full">Relysia</div>
              Blockchain As A Service platform
            </div>
            <h2 className="text-6xl text-[#363663]">
              Keep full control and make it your own.
            </h2>
            <p className="text-lg text-[#666F99] my-10">
              If you are new to the blockchain industry and want to try
              exploring the Blockchain, you are well suited to Basic
              Infrastructure. Otherwise, if you are someone who has good
              knowledge of the blockchain industry and wants to create your very
              own sophisticated blockchain platforms while keeping your very own
              user database and control over settings and funds, we offer you to
              try the Dedicated Infrastructure package from Relysia.
            </p>
            <div className="flex flex-col gap-3">
              <NextLink href="https://docs.relysia.com">
                <a className="text-center font-medium py-4 rounded-lg text-gray-500 border">
                  Basic Infrastructure
                </a>
              </NextLink>
              <NextLink href="/onboarding">
                <a
                  className="text-center font-medium py-4 rounded-lg text-white"
                  style={{
                    background:
                      'linear-gradient(90.27deg, #3DB8F5 3.53%, #1F42EF 100.29%)',
                  }}
                >
                  Dedicated Infrastructure
                </a>
              </NextLink>
            </div>
          </div>

          <div className="flex-1 hidden lg:block">
            <img
              src="/images/app/infrastructure/side-image.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-24">
        {filteredProjects.map(({ projectName, serviceId }) => (
          <ProjectGridItem id={serviceId} name={projectName} />
        ))}
      </div>
    )
  }

  return (
    <div className="p-5 md:p-10">
      <Breadcrumbs
        items={[{ name: 'Infrastructure', href: 'infrastructure' }]}
        className="mb-10"
      />
      <div className="flex justify-between items-start sm:items-center sm:flex-row flex-col gap-2 mb-10">
        <h1 className="font-medium text-3xl">Projects</h1>
        <SearchBar {...{ search, setSearch }} />
      </div>

      <div className="flex justify-between items-start sm:items-center sm:flex-row flex-col gap-2">
        <div>
          <h2 className="font-medium text-md">Your Relysia projects</h2>
          <p className="text-sm text-gray-500">
            Supercharge your software by powering up with Relysia
            infrastructure.
          </p>
        </div>
        <NextLink href="/onboarding">
          <a
            className="rounded-lg py-2 px-5 text-white flex items-center gap-2"
            style={{
              background:
                'linear-gradient(90.27deg, #3DB8F5 3.53%, #1F42EF 100.29%)',
            }}
          >
            <PlusIcon className="h-5 w-5" /> Add Project
          </a>
        </NextLink>
      </div>

      <div className="mt-6 flex items-center justify-between mb-8 flex-wrap gap-5"></div>

      <ProjectsGrid />
    </div>
  )
}
