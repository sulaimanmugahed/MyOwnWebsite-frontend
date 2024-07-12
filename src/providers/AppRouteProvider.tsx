import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { ProjectsPage } from "../pages/ProjectsPage"
import { NotFoundPage } from "../pages/NotFoundPage"
import { AboutPage } from "../pages/AboutPage"
import App from "../App"
import { ContactPage } from "../pages/ContactPage"
import { LoginModal } from "../components/account/LoginModal"
import { RegisterModal } from "../components/account/RegisterModal"
import { UnAuthorizedPage } from "../pages/UnAuthorizedPage"
import { PrivateRoutes } from "../components/common/PrivateRoutes"
import { ProjectDetails } from "../components/projects/ProjectDetails"
import PersistAuth from "../components/common/PersistAuth"
import CopyToBoard from "../components/common/CopyToBoard"
import ManageProjectsPage from "../pages/manage/ManageProjectsPage"
import CreateProjectModal from "../components/projects/CreateProjectModal"
import EditProjectModal from "../components/projects/EditProjectModal"
import DeleteProjectModal from "../components/projects/DeleteProjectModal"
import { ConfirmEmailPage } from "../pages/ConfirmEmailPage"
import EmailVerificationPage from "../pages/EmailVerificationPage"


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: 'copy',
                element: <CopyToBoard />

            },
            {
                element: <PersistAuth />,
                children: [
                    {
                        index: true,
                        element: <HomePage />
                    },
                    {
                        path: 'about',
                        element: <AboutPage />
                    },
                    {
                        path: 'login',
                        element: <LoginModal />
                    },
                    {
                        path: 'register',
                        element: <RegisterModal />
                    },
                    {
                        path: 'unauthorized',
                        element: <UnAuthorizedPage />
                    },
                    {
                        element: <PrivateRoutes allowedRoles={['Admin']} />,
                        children: [
                            {
                                path: 'manage',
                                element: null,
                                children: [
                                    {
                                        path: 'projects',
                                        element: <ManageProjectsPage />,
                                        children: [
                                            {
                                                path: 'create',
                                                element: <CreateProjectModal />
                                            },
                                            {
                                                path: 'edit/:projectId',
                                                element: <EditProjectModal />
                                            },
                                            {
                                                path: 'delete/:projectId',
                                                element: <DeleteProjectModal />
                                            },
                                            {
                                                path: 'details/:projectId',
                                                element: <ProjectDetails />
                                            }

                                        ]
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        path: 'projects',
                        element: <ProjectsPage />,
                        children: [
                            {
                                element: <PrivateRoutes allowedRoles={['User', 'Admin']} />,
                                children: [

                                    {
                                        path: ':projectId',
                                        element: <ProjectDetails />
                                    }
                                ]
                            }
                        ]
                    },
                    {

                        path: 'contact',
                        element: <ContactPage />

                    },
                    {
                        path: 'confirm/:userEmail',
                        element: <ConfirmEmailPage />
                    },
                    {
                        path: 'verifyEmail',
                        element: <EmailVerificationPage />
                    }

                ]
            }


        ]
    },

])

export const AppRouteProvider = () => {
    return <RouterProvider router={router} />

}