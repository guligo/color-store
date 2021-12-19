package me.guligo.cs.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collection;
import java.util.HashSet;
import me.guligo.cs.dtos.ColorDto;
import me.guligo.cs.dtos.UserDto;
import me.guligo.cs.dtos.external.MetadataDto;
import me.guligo.cs.services.ColorService;
import me.guligo.cs.services.UserService;
import me.guligo.cs.services.external.MetadataService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@WebMvcTest({ColorController.class, ColorService.class})
public class ColorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ColorService colorService;

    @MockBean
    private MetadataService metadataService;

    @MockBean
    private UserService userService;

    @Before
    public void setUp() {
        Mockito.when(metadataService.getMetadata(Mockito.eq(0))).thenReturn(
                MetadataDto.builder()
                        .name("Test Color")
                        .image("test.png")
                        .description("This is the Test Color")
                        .build());

        Mockito.when(userService.getUser(Mockito.eq("0x123"))).thenReturn(
                UserDto.builder()
                        .id("0x123")
                        .alias("Test User")
                        .build());

        colorService.addColor(0, "0x123");
    }

    @Test
    public void getColors_Should_ReturnColorList() throws Exception {
        final String res = mockMvc.perform(MockMvcRequestBuilders.get("/colors")
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        final Collection<ColorDto> colors = new ObjectMapper().readValue(res, new HashSet<ColorDto>().getClass());

        Assert.assertEquals(1, colors.size());
    }

    @Test
    public void getColor_Should_ReturnColor_When_ColorExists() throws Exception {
        final String res = mockMvc.perform(MockMvcRequestBuilders.get("/colors/0")
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        final ColorDto color = new ObjectMapper().readValue(res, ColorDto.class);

        Assert.assertEquals(0, color.getTokenId());
    }

}
