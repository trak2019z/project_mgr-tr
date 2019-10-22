FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["QuickApp/QuickApp.csproj", "QuickApp/"]
COPY ["DAL/DAL.csproj", "DAL/"]
RUN dotnet restore "QuickApp/QuickApp.csproj"
COPY . .
WORKDIR "/src/QuickApp"
RUN dotnet build "QuickApp.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "QuickApp.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "QuickApp.dll"]