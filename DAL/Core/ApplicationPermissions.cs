
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;

namespace DAL.Core
{
    public static class ApplicationPermissions
    {
        public static ReadOnlyCollection<ApplicationPermission> AllPermissions;


        public const string UsersPermissionGroupName = "Administracja użytkownikami";
        public static ApplicationPermission ViewUsers = new ApplicationPermission("Podgląd użytkowników", "users.view", UsersPermissionGroupName, "Uprawnienie do podglądu kont użytkowników systemu");
        public static ApplicationPermission ManageUsers = new ApplicationPermission("Zarządzanie użytkownikami", "users.manage", UsersPermissionGroupName, "Uprawnienie do tworzenia/edycji oraz usuwania kont użytkowników systemu");

        public const string RolesPermissionGroupName = "Administracja rolami";
        public static ApplicationPermission ViewRoles = new ApplicationPermission("Podgląd ról", "roles.view", RolesPermissionGroupName, "Uprawnienie do podglądu ról w systemie");
        public static ApplicationPermission ManageRoles = new ApplicationPermission("Zarządzanie rolami", "roles.manage", RolesPermissionGroupName, "Uprawnienie do tworzenia/edycji oraz usuwania ról w systemie");
        public static ApplicationPermission AssignRoles = new ApplicationPermission("Przypisywanie ról", "roles.assign", RolesPermissionGroupName, "Uprawnienie do przypisywania ról do użytkowników");

        public const string ProjectPermissionGroupName = "Administracja projektami";

        public static ApplicationPermission CreateProjects = new ApplicationPermission("Tworzenie projektów", "projects.create", ProjectPermissionGroupName, "Uprawnienie do tworzenia projektów");
        public static ApplicationPermission DeleteProjects = new ApplicationPermission("Usuwanie projektów", "projects.delete", ProjectPermissionGroupName, "Uprawnienie do usuwania projektów");
        public static ApplicationPermission ViewProjectsStatistics = new ApplicationPermission("Podgląd statystyk projektów", "projects.viewstatistics", ProjectPermissionGroupName, "Uprawnienie do podglądania statystyk projektów");


        static ApplicationPermissions()
        {
            List<ApplicationPermission> allPermissions = new List<ApplicationPermission>()
            {
                ViewUsers,
                ManageUsers,

                ViewRoles,
                ManageRoles,
                AssignRoles,
                CreateProjects,
                DeleteProjects,
                ViewProjectsStatistics
            };

            AllPermissions = allPermissions.AsReadOnly();
        }

        public static ApplicationPermission GetPermissionByName(string permissionName)
        {
            return AllPermissions.Where(p => p.Name == permissionName).SingleOrDefault();
        }

        public static ApplicationPermission GetPermissionByValue(string permissionValue)
        {
            return AllPermissions.Where(p => p.Value == permissionValue).SingleOrDefault();
        }

        public static string[] GetAllPermissionValues()
        {
            return AllPermissions.Select(p => p.Value).ToArray();
        }

        public static string[] GetAdministrativePermissionValues()
        {
            return new string[] { ManageUsers, ManageRoles, AssignRoles};
        }
    }



    public class ApplicationPermission
    {
        public ApplicationPermission()
        { }

        public ApplicationPermission(string name, string value, string groupName, string description = null)
        {
            Name = name;
            Value = value;
            GroupName = groupName;
            Description = description;
        }



        public string Name { get; set; }
        public string Value { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }


        public override string ToString()
        {
            return Value;
        }


        public static implicit operator string(ApplicationPermission permission)
        {
            return permission.Value;
        }
    }
}
