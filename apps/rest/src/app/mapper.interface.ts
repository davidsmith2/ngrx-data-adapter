export interface Mapper<DAO, DTO> {
  mapDaoToDto(dao: DAO): DTO;
  mapDtoToDao(dto: DTO): DAO;
}