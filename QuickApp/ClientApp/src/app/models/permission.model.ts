export type PermissionNames =
    'Podgląd użytkowników' | 'Zarządzanie Użytkownikami' |
  'Podgląd ról' | 'Zarządzanie rolami' | 'Przypisywanie ról'|'Tworzenie projektów'|'Usuwanie projektów|Podgląd statystyk projektów';

export type PermissionValues =
    'users.view' | 'users.manage' |
  'roles.view' | 'roles.manage' | 'roles.assign' | 'projects.create' | 'projects.delete' |'projects.viewstatistics';

export class Permission {

    public static readonly viewUsersPermission: PermissionValues = 'users.view';
    public static readonly manageUsersPermission: PermissionValues = 'users.manage';

    public static readonly viewRolesPermission: PermissionValues = 'roles.view';
    public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
    public static readonly assignRolesPermission: PermissionValues = 'roles.assign';
  public static readonly createProjectPermission: PermissionValues = 'projects.create';
  public static readonly deleteProjectPermission: PermissionValues = 'projects.delete';
  public static readonly viewProjectStatistics: PermissionValues = 'projects.viewstatistics';


    constructor(name?: PermissionNames, value?: PermissionValues, groupName?: string, description?: string) {
        this.name = name;
        this.value = value;
        this.groupName = groupName;
        this.description = description;
    }

    public name: PermissionNames;
    public value: PermissionValues;
    public groupName: string;
    public description: string;
}
